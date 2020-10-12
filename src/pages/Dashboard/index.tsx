// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FormEvent, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import api from '../../services/api';

import logo from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

interface Repository {
  // Nao precisamos explicitar TODAS as tipagens q serao retornadas, apenas os falores que utilizaremos
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState(''); // Estado para podermos ter acesso ao valor digitado no campo de input.
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storedRepositories) {
      return JSON.parse(storedRepositories);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories', // @__NOME_DA_APLICACAO__ -> O localStorage é compartilhado por todas as aplicacoes q usam  o mesmo endereço -> Pode ser um problema.
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    // console.log(newRepo);

    const response = await api.get<Repository>(`repos/${newRepo}`);
    // console.log(response.data);

    const repository = response.data;

    setRepositories([...repositories, repository]);
    setNewRepo('');
  }

  return (
    <>
      <img src={logo} alt="Github explorer" />
      <Title>Explore repositórios no github</Title>
      <Form onSubmit={handleAddRepository}>
        {/* Mudança de valor do input => mudança de estado no react */}
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repositories>
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size="25" />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
