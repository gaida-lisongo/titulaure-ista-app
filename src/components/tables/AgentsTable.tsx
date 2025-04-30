import { Agent } from "@/types/agents";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface AgentsTableProps {
  agents: Agent[];
}

export default function AgentsTable({ agents }: AgentsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("tous"); // tous, actifs, inactifs

  // Fonction de filtrage des agents
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.matricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.post_nom.toLowerCase().includes(searchTerm.toLowerCase());

    switch (currentTab) {
      case "actifs":
        return matchesSearch && agent.statut === "actif";
      case "inactifs":
        return matchesSearch && agent.statut === "inactif";
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        {/* Tabs */}
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              currentTab === "tous"
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-800"
            }`}
            onClick={() => setCurrentTab("tous")}
          >
            Tous
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              currentTab === "actifs"
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-800"
            }`}
            onClick={() => setCurrentTab("actifs")}
          >
            Actifs
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              currentTab === "inactifs"
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-800"
            }`}
            onClick={() => setCurrentTab("inactifs")}
          >
            Inactifs
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher un agent..."
            className="w-full md:w-80 pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                Matricule
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Nom
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Post-nom
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Prénom
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Statut
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.map((agent) => (
              <tr key={agent.id}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {agent.matricule}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {agent.nom}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {agent.post_nom}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {agent.prenom}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span
                    className={`inline-block rounded px-2.5 py-0.5 ${
                      agent.statut === "actif"
                        ? "bg-success/10 text-success"
                        : "bg-danger/10 text-danger"
                    }`}
                  >
                    {agent.statut}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}