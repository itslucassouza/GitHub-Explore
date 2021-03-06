import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import logoImg from '../../assets/gitlogo.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
    repository: string;
}

const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();
    return(
        <>
        <Header>
            <img src={logoImg} alt="githubExplorer" />
            <Link to="/dashboard">
                <FiChevronLeft size={16} />
                voltar
            </Link>
        </Header>
        <RepositoryInfo>
            <header>
                <img src='' alt="avatar" />
                <div>
                    <strong>Rockeatseat/unform</strong>
                    <p>Descrição</p>
                </div>
            </header>
            <ul>
                <li>
                    <strong>1808</strong>
                    <span>Stars</span>
                </li>
                <li>
                    <strong>48</strong>
                    <span>Forks</span>
                </li>
                <li>
                    <strong>67</strong>
                    <span>issues Abertas</span>
                </li>
            </ul>
        </RepositoryInfo>

        <Issues>
        <Link to={`/`}>
                           
                        <div>
                            <strong>asdhas</strong>
                            <p>sdjahsauh</p>
                        </div>

                        <FiChevronRight size={20} />
                        </Link>
        </Issues>
        </>
    )
};
export default Repository;