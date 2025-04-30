"use client";
import React from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Image from "next/image";
import { Agent } from "@/types/agents";
import api from "@/api";

export default function UserCard({ agent }: { agent: Agent }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const[password, setPassword] = React.useState("");
  const { Titulaire } = api;

  const fetchUserToken = async ({login, password} : {login: string, password: string}) => {
    setLoading(true);
    try {
      const response = await Titulaire.loginTitulaire(login, password);

      if (response.success) {
        setError(false);
        setLoading(false);
        return response.token;
      }
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
  }

  const handleSave = async (e: any) => {
    e.preventDefault();
    // Handle save logic here
    const token = await fetchUserToken({login: agent.matricule, password});
    if (!token) {
        setMessage("Erreur de connexion !");
        setError(true);
        setLoading(false);
        // return;
    }

    //Save token in cookies
    document.cookie = `token=${token}; path=/; max-age=3600`;
    setMessage("Connexion réussie !");

    closeModal();

    window.location.href = "/";
  };
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <Image
                width={80}
                height={80}
                src={ agent.avatar ? `https://ista-gm.net/public/Views/template/img/profile/${agent.avatar}` : "/images/user/owner.jpg"}
                alt="user"
              />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                {agent.nom} {agent.post_nom} {agent.prenom}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {agent.grade} 
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {agent.matricule}
                </p>
              </div>
            </div>
            
          </div>
          <button
            onClick={openModal}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4ZM6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z"
                fill="currentColor"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 13C8.13401 13 5 16.134 5 20V21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21V20C3 15.0294 7.02944 11 12 11C16.9706 11 21 15.0294 21 20V21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21V20C19 16.134 15.866 13 12 13Z"
                fill="currentColor"
              />
            </svg>
            Connection
          </button>
        </div>
      </div>
      
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Connexion
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              {message}
            </p>
          </div>
          <form className="flex flex-col">
            <div className="custom-scrollbar h-[280px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  {message}
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>Nom: {agent.nom}</Label>
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Grade : {agent.grade}</Label>
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Post - nom: {agent.post_nom}</Label>
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email: {agent.e_mail}</Label>
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Prenom: {agent.prenom}</Label>
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Téléphone: {agent.telephone}</Label>
                  </div>

                  <div className="col-span-2">
                    <Label>Matricule : {agent.matricule} </Label>
                    <Input 
                        type="password" 
                        placeholder="Entrer votre mot de passe"
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Annuler
              </Button>
              <Button size="sm" onClick={() => handleSave(event)}>
                Se connecter
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
