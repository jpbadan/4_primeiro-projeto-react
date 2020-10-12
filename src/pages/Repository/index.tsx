import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  return (
    <>
      <Header>
        <img src={logo} alt="github explorer" />
        <Link to="/">
          <FiChevronLeft size="25" />
          Voltar
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/MD5_algorithm.svg/300px-MD5_algorithm.svg.png"
            alt="frfr"
          />
          <div>
            <strong>Rck/unform</strong>
            <p>Descricao</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>1888</strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>48</strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>67</strong>
            <span>Issues</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>
        <Link to="ewsdgagsd">
          <div>
            <strong>repository.full_name</strong>
            <p>repository.description</p>
          </div>

          <FiChevronRight size="25" />
        </Link>
      </Issues>
    </>
  );
};

export default Repository;
