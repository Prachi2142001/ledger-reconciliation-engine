"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import UploadSection from "@/src/components/UploadSection";
import SummaryCards from "@/src/components/SummaryCards";
import FlagPanel from "@/src/components/FlagPanel";
import RecurringTransactions from "@/src/components/RecurringTransactions";
import CategoryBreakdown from "@/src/components/CategoryBreakdown";
import TransactionFilters from "@/src/components/TransactionFilters";
import TransactionTable from "@/src/components/TransactionTable";

const API_URL = "http://localhost:5000";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [accountFilter, setAccountFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [flaggedOnly, setFlaggedOnly] = useState(false);

  const [reconciliation, setReconciliation] = useState<any>(null);

  const loadData = async () => {
    const txRes = await axios.get(`${API_URL}/api/transactions`);
    const reconcileRes = await axios.get(`${API_URL}/api/reconcile`);

    setTransactions(txRes.data.data);
    setReconciliation(reconcileRes.data);
    setSummary(reconcileRes.data.summary);
  };

  useEffect(() => {
    loadData();
  }, []);

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    await axios.post(`${API_URL}/api/upload`, formData);

    await loadData();

    setLoading(false);
    setFile(null);
  };

  const flaggedIds = new Set([
    ...(reconciliation?.duplicateIssues || []).map((i: any) => i.transactionId),
    ...(reconciliation?.outOfOrderIssues || []).map(
      (i: any) => i.transactionId,
    ),
  ]);

  const filteredTransactions = transactions.filter((tx) => {
    const accountMatch =
      !accountFilter ||
      tx.accountId.toLowerCase().includes(accountFilter.toLowerCase());

    const categoryMatch =
      !categoryFilter ||
      tx.category.toLowerCase().includes(categoryFilter.toLowerCase());

    const monthMatch = !monthFilter || tx.date.startsWith(monthFilter);

    const flaggedMatch = !flaggedOnly || flaggedIds.has(tx.id);

    return accountMatch && categoryMatch && monthMatch && flaggedMatch;
  });

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-xl bg-white p-6 shadow">
          <h1 className="text-3xl font-bold text-slate-800">
            Ledger Reconciliation Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Upload transaction files, review summaries and inspect categorized
            transactions.
          </p>
        </div>

        <UploadSection
          file={file}
          setFile={setFile}
          uploadFile={uploadFile}
          loading={loading}
        />

        {summary && (
          <>
            <SummaryCards summary={summary} />

            <div className="grid gap-6 lg:grid-cols-2">
              <FlagPanel flags={summary.flags} />

              <RecurringTransactions items={summary.recurringItems} />
            </div>

            <CategoryBreakdown categories={summary.categoryBreakdown} />
          </>
        )}

        <TransactionFilters
          accountFilter={accountFilter}
          setAccountFilter={setAccountFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          monthFilter={monthFilter}
          setMonthFilter={setMonthFilter}
          flaggedOnly={flaggedOnly}
          setFlaggedOnly={setFlaggedOnly}
        />

        <TransactionTable
          transactions={filteredTransactions}
          flaggedIds={flaggedIds}
          reconciliation={reconciliation}
        />
      </div>
    </main>
  );
}
