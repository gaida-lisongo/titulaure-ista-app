import { Agent } from "@/types/agents";
import { useState } from "react";
import Image from "next/image";
import UserCard from "@/components/user-profile/UserCard";
import {EyeIcon} from "@/icons";

interface AgentListProps {
  data: Agent[];
}

export default function AgentList({ data }: AgentListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 6;

  // Filtrer les agents en fonction de la recherche
  const filteredAgents = data.filter((agent) =>
    `${agent.nom} ${agent.post_nom} ${agent.prenom} ${agent.matricule}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Calculer la pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAgents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Barre de recherche */}
      <div className="relative w-full max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Rechercher un agent..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <EyeIcon className="absolute left-3 top-2.5 text-gray-500" />
      </div>

      {/* Liste des agents */}
      <div className="grid gap-6">
        {currentItems.map((item, idx) => (
          <UserCard key={idx} agent={item} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Précédent
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
}