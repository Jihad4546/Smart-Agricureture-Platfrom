"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../contexts/LanguageContext";
import { getAuthUserClient } from "../../../lib/auth";
import { ArrowLeft, Coins, Plus, Trash2, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

const translations = {
  en: {
    backToDashboard: "Back to Dashboard",
    farmFinance: "Farm Finance Ledger",
    addRecord: "Log Transaction",
    categoryEn: "Title (English)",
    categoryBn: "Title (Bangla)",
    type: "Transaction Type",
    income: "Income",
    expense: "Expense",
    amount: "Amount (BDT)",
    date: "Date",
    note: "Notes",
    submit: "Log Transaction",
    totalIncome: "Total Income",
    totalExpenses: "Total Expenses",
    netProfit: "Net Profit / Loss",
    recentLogs: "Transaction History",
    delete: "Delete",
    confirmDelete: "Are you sure you want to delete this transaction?",
    fillAll: "Please fill in all required fields.",
    successLog: "Transaction logged successfully!",
    chartTitle: "Financial Breakdown",
  },
  bn: {
    backToDashboard: "ড্যাশবোর্ডে ফিরে যান",
    farmFinance: "খামার আর্থিক খাতা",
    addRecord: "হিসাব যুক্ত করুন",
    categoryEn: "বিবরণ (ইংরেজি)",
    categoryBn: "বিবরণ (বাংলা)",
    type: "লেনদেনের ধরন",
    income: "আয়",
    expense: "ব্যয়",
    amount: "পরিমাণ (টাকা)",
    date: "তারিখ",
    note: "মন্তব্য",
    submit: "যুক্ত করুন",
    totalIncome: "মোট আয়",
    totalExpenses: "মোট ব্যয়",
    netProfit: "নিট লাভ / ক্ষতি",
    recentLogs: "লেনদেনের ইতিহাস",
    delete: "মুছে ফেলুন",
    confirmDelete: "আপনি কি এই লেনদেনটি মুছে ফেলতে চান?",
    fillAll: "দয়া করে সব প্রয়োজনীয় তথ্য পূরণ করুন।",
    successLog: "লেনদেনটি সফলভাবে যুক্ত হয়েছে!",
    chartTitle: "আর্থিক বিশ্লেষণ",
  }
};

export default function FinancePage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = translations[lang];

  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [categoryEn, setCategoryEn] = useState("");
  const [categoryBn, setCategoryBn] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const user = getAuthUserClient();
    if (!user) {
      router.push("/auth/login?redirect=/finance");
      return;
    }

    try {
      const stored = localStorage.getItem("farm_finance");
      if (stored) {
        setRecords(JSON.parse(stored));
      } else {
        const defaultFinance = [
          { id: "1", type: "income", category: "Rice Sale", categoryBn: "ধান বিক্রি", amount: 25000, date: "2026-08-15", note: "Bumper harvest sale" },
          { id: "2", type: "expense", category: "Fertilizer", categoryBn: "সার ক্রয়", amount: 5000, date: "2026-08-01", note: "Urea and TSP" },
          { id: "3", type: "expense", category: "Seed purchase", categoryBn: "বীজ ক্রয়", amount: 3000, date: "2026-08-05", note: "Potato seeds" }
        ];
        localStorage.setItem("farm_finance", JSON.stringify(defaultFinance));
        setRecords(defaultFinance);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryEn || !categoryBn || !amount || !date) {
      setError(t.fillAll);
      return;
    }

    try {
      const newRecord = {
        id: Date.now().toString(),
        type,
        category: categoryEn,
        categoryBn,
        amount: Number(amount),
        date,
        note,
      };

      const updated = [newRecord, ...records];
      setRecords(updated);
      localStorage.setItem("farm_finance", JSON.stringify(updated));

      // Reset Form
      setCategoryEn("");
      setCategoryBn("");
      setAmount("");
      setDate("");
      setNote("");
      setError("");
      setSuccess(t.successLog);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError("An error occurred.");
    }
  };

  const handleDelete = (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    const updated = records.filter((rec) => rec.id !== id);
    setRecords(updated);
    localStorage.setItem("farm_finance", JSON.stringify(updated));
  };

  // Math
  const totalIncome = records
    .filter((r) => r.type === "income")
    .reduce((acc, r) => acc + r.amount, 0);

  const totalExpense = records
    .filter((r) => r.type === "expense")
    .reduce((acc, r) => acc + r.amount, 0);

  const netProfit = totalIncome - totalExpense;

  // Chart heights
  const maxVal = Math.max(totalIncome, totalExpense, 1000);
  const incomeHeight = (totalIncome / maxVal) * 100;
  const expenseHeight = (totalExpense / maxVal) * 100;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F3]">
        <div className="text-center animate-pulse">
          <Coins className="mx-auto h-12 w-12 text-[#1F3D2B]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F3] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Navigation Link */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-[#1F3D2B] transition hover:text-[#2F5943]"
        >
          <ArrowLeft size={16} />
          {t.backToDashboard}
        </button>

        {/* Page Title */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF0E8] text-[#1F3D2B]">
            <Coins size={24} />
          </div>
          <h1 className="text-3xl font-bold text-[#16241C]">{t.farmFinance}</h1>
        </div>

        {/* Math Summaries */}
        <div className="grid gap-6 sm:grid-cols-3 mb-8">
          <div className="rounded-2xl border border-[#E4DFD1] bg-white p-5 shadow-sm flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
              <TrendingUp size={22} />
            </div>
            <div>
              <p className="text-xs text-[#6B7A6E] font-medium">{t.totalIncome}</p>
              <p className="text-lg font-bold text-[#1F3D2B]">৳{totalIncome.toLocaleString()}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E4DFD1] bg-white p-5 shadow-sm flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-700">
              <TrendingDown size={22} />
            </div>
            <div>
              <p className="text-xs text-[#6B7A6E] font-medium">{t.totalExpenses}</p>
              <p className="text-lg font-bold text-red-700">৳{totalExpense.toLocaleString()}</p>
            </div>
          </div>

          <div className={`rounded-2xl border border-[#E4DFD1] p-5 shadow-sm flex items-center gap-4 ${netProfit >= 0 ? "bg-[#EAF0E8]/50" : "bg-red-50/20"}`}>
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${netProfit >= 0 ? "bg-[#EAF0E8] text-[#1F3D2B]" : "bg-red-100 text-red-700"}`}>
              <Coins size={22} />
            </div>
            <div>
              <p className="text-xs text-[#6B7A6E] font-medium">{t.netProfit}</p>
              <p className={`text-lg font-bold ${netProfit >= 0 ? "text-[#1F3D2B]" : "text-red-700"}`}>
                ৳{netProfit.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid gap-6 lg:grid-cols-12">
          
          {/* Left Column: Form & Chart (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Log form */}
            <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold text-[#16241C] mb-4 flex items-center gap-2">
                <Plus size={16} className="text-[#1F3D2B]" />
                {t.addRecord}
              </h2>

              {error && (
                <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-4 text-xs font-semibold text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 rounded-xl bg-green-50 border border-green-200 p-4 text-xs font-semibold text-[#1F3D2B]">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-2">
                    {t.type}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setType("income")}
                      className={`h-10 rounded-xl font-semibold text-xs border transition ${
                        type === "income"
                          ? "bg-[#1F3D2B] text-white border-[#1F3D2B]"
                          : "bg-white text-[#6B7A6E] border-[#E4DFD1] hover:bg-[#FAF8F3]"
                      }`}
                    >
                      {t.income}
                    </button>
                    <button
                      type="button"
                      onClick={() => setType("expense")}
                      className={`h-10 rounded-xl font-semibold text-xs border transition ${
                        type === "expense"
                          ? "bg-red-700 text-white border-red-700"
                          : "bg-white text-[#6B7A6E] border-[#E4DFD1] hover:bg-[#FAF8F3]"
                      }`}
                    >
                      {t.expense}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-1.5">
                    {t.categoryEn} *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rice seeds purchase"
                    value={categoryEn}
                    onChange={(e) => setCategoryEn(e.target.value)}
                    className="w-full h-10 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-3.5 text-xs text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-1.5">
                    {t.categoryBn} *
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: ধান বীজ ক্রয়"
                    value={categoryBn}
                    onChange={(e) => setCategoryBn(e.target.value)}
                    className="w-full h-10 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-3.5 text-xs text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                    required
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-1.5">
                      {t.amount} *
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 1500"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full h-10 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-3.5 text-xs text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-1.5">
                      {t.date} *
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full h-10 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-3.5 text-xs text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#16241C] uppercase tracking-wider mb-1.5">
                    {t.note}
                  </label>
                  <input
                    type="text"
                    placeholder="Optional memo..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full h-10 rounded-xl border border-[#E4DFD1] bg-[#FAF8F3] px-3.5 text-xs text-[#16241C] outline-none focus:border-[#1F3D2B] focus:bg-white transition"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-[#1F3D2B] text-xs font-semibold text-white transition hover:bg-[#2F5943] shadow-lg mt-2"
                >
                  <Plus size={14} />
                  {t.submit}
                </button>
              </form>
            </div>

            {/* CSS comparative bar chart */}
            <div className="rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold text-[#16241C] mb-4">{t.chartTitle}</h2>
              <div className="flex items-end justify-around gap-6 h-40 pt-4 border-b border-[#E4DFD1]">
                {/* Income Bar */}
                <div className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-12 bg-[#1F3D2B] rounded-t-lg transition-all duration-500"
                    style={{ height: `${incomeHeight}%` }}
                    title={`Income: ৳${totalIncome}`}
                  />
                </div>
                {/* Expense Bar */}
                <div className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-12 bg-red-600 rounded-t-lg transition-all duration-500"
                    style={{ height: `${expenseHeight}%` }}
                    title={`Expense: ৳${totalExpense}`}
                  />
                </div>
              </div>
              <div className="flex justify-around text-xs font-semibold text-[#16241C] mt-2">
                <span>{t.income}</span>
                <span>{t.expense}</span>
              </div>
            </div>

          </div>

          {/* Right Column: History List (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-[#E4DFD1] bg-white p-6 shadow-sm h-fit">
            <h2 className="text-base font-bold text-[#16241C] mb-6">{t.recentLogs}</h2>
            
            <div className="divide-y divide-[#FAF8F3] space-y-3">
              {records.length === 0 ? (
                <p className="text-xs text-[#6B7A6E] italic py-4">No records yet.</p>
              ) : (
                records.map((rec) => (
                  <div key={rec.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        rec.type === "income" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                      }`}>
                        {rec.type === "income" ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#16241C]">
                          {lang === "bn" ? rec.categoryBn : rec.category}
                        </h4>
                        <p className="text-[10px] text-[#6B7A6E] mt-0.5">
                          {rec.date} {rec.note && `• ${rec.note}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-extrabold ${rec.type === "income" ? "text-[#1F3D2B]" : "text-red-700"}`}>
                        {rec.type === "income" ? "+" : "-"}৳{rec.amount.toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleDelete(rec.id)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg text-[#6B7A6E]/60 hover:text-red-600 hover:bg-red-50 transition"
                        title={t.delete}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
