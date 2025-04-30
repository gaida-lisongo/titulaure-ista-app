"use client";
import React, { useEffect } from "react";
import api from "@/api";
import { Agent } from "@/types/agents";
import UserCard from "@/components/user-profile/UserCard";
import AgentList from "@/components/agents/AgentList";

export default function Profile() {
  const { Titulaire } = api;
  const [data, setData] = React.useState<Agent[] | []>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await Titulaire.getAllTitulaires();
            console.log(response); // Handle the response data as needed
            if (response.success) {
              setData(response.data);
              setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }
    console.log("Fetching data...");
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="animate-spin h-5 w-5 text-gray-900 dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            fill="none"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12zm2.5-1h11a2.5 2.5 0 1 1-5 0h-6a2.5 2.5 0 0 1-5 0z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Connectez - vous à votre compte
        </h3>
        <div className="space-y-6">
          <AgentList data={data} />
        </div>
      </div>
    </div>
  );
}
