import React, { useState, useEffect, FormEvent } from 'react';
import {FiChevronRight} from 'react-icons/fi';
import { Link } from 'react-router-dom';

//adição de  um novo repositorio
        // consumir api do github
        //Salvar novo repositorio no estado

import api from '../../services/api';

import logoImg from '../../assets/gitlogo.svg';


import {Title, Form, Repositories, Error} from './styles'
import Repository from '../Repository';

interface Repository{
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}


const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('')
    const [error, setError] = useState('');
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storegedRepositories = localStorage.getItem('@gitHubExplorer');

        if(storegedRepositories) {
            return JSON.parse(storegedRepositories)
        }else {
            return [];
        }
    });

    

    useEffect(() => {
        localStorage.setItem('@gitHubExplorer', JSON.stringify(repositories))
    }, [repositories])

    async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        if(!newRepo) {
            setError('Digite o autor/nome do repositório')
            return;
        }
        try{
            const response = await api.get(`repos/${newRepo}`);
            const repository = response.data;
            setRepositories([...repositories, repository]);
            setNewRepo('');
            setError('');
        } catch(err) {
            setError("Erro na busca do repositório")
        }
    }

    return(
        <>
            <img src={logoImg} alt="github explore"/>
            <Title>Explore repositórios no Github</Title>

            <Form hasError={ !!error} onSubmit={handleAddRepository} action="">
                <input value={newRepo} onChange={(e) => setNewRepo(e.target.value)} 
                placeholder="Digite o nome do Repositório"></input>
                <button type="submit">Pesquisar</button>    
            </Form> 

            {error && <Error>{error}</Error> }

            <Repositories>
                {
                    repositories.map((repo, index) => (
                        <Link key={repo.full_name} to={`/repositories`}>
                            <img 
                            src={repo.owner.avatar_url} 
                            alt={repo.owner.login} ></img>
                        <div>
                            <strong>{repo.full_name}</strong>
                            <p>{repo.description}</p>
                        </div>

                        <FiChevronRight size={20} />
                        </Link>
                        
                    ))
                }
            </Repositories>
        </>
    )
};
export default Dashboard;