import { useEffect, useState } from "react";
import { getDashboardSummary } from "../api/dashboardApi";
import type { DashboardSummary } from "../api/dashboardApi";

export const useDashboard = () => {
    const [data, setData] = useState<DashboardSummary | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboard = async () => {
        try {
            const result = await getDashboardSummary();
            setData(result);
        } catch (err) {
            console.error(err);
            setError("Gagal memuat data dashboard.");
        } finally {
            setLoading(false);
        }
        };

        fetchDashboard();
    }, []);

    return { data, loading, error };
};
