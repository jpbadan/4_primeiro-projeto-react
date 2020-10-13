import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  // Funcoes q fazem apenas um retorno podem usar parenteses e o return estará subentendido
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      {/* O Path (sem o exact) faz uma verificacao de inclusao do endereço especificado */}
      <Route path="/" exact component={Dashboard} />
      <Route path="/repository/:repository+" component={Repository} />
    </Switch>
  </BrowserRouter>
);

// Em <Route path="/repository/:repository+" component={Repository} />
// o :repository+ indica que estamos passando uma variavel para a rota (repository)
// o '+' indica que a variavel é tudo o que vem apos os dois pontos, caso contrario
// pararia na proxima barra / o que nos atrapalha ja q a api do github retorna resultados
// contendo barra no nome.

export default Routes;
