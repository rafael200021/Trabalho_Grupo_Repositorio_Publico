import React from "react";
import "./App.css";
import Inicio from "./View/Inicio.js";
import Login from "./View/Login.js";
import Registrar from "./View/Registro.js";
import Cadastrar from "./View/Cadastrar";
import Times from "./View/Times";
import Time from "./View/Time";
import Grupos from "./View/Grupos";
import Grupo from "./View/Grupo";
import Busca from "./View/Buscar";
import Gerenciar from "./View/Gerenciar";
import Lider from "./View/Lider";
import Autorizar from "./View/Autorizar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Inicio />
        </Route>
        <Route exact path="/logar">
          <Login />
        </Route>
        <Route exact path="/registrar">
          <Registrar />
        </Route>
        <Route exact path="/time/cadastrar">
          <Cadastrar pagina="time"/>
        </Route>
        <Route exact path="/time/editar/:id">
          <Cadastrar pagina="time" tipo="editar"/>
        </Route>
        <Route exact path="/time">
          <Times/>
        </Route>
        <Route exact path="/grupo">
          <Grupos/>
        </Route>
        <Route exact path="/gerenciar">
          <Gerenciar/>
        </Route>
        <Route exact path="/grupo/cadastrar/:id">
          <Cadastrar pagina="grupo"/>
        </Route>
        <Route exact path="/usuario/editar">
          <Cadastrar pagina="usuario"/>
        </Route>
        <Route exact path="/time/:id">
          <Time/>
        </Route>
        <Route exact path="/grupo/:id">
          <Grupo/>
        </Route>
        <Route exact path="/busca/:query">
          <Busca/>
        </Route>
        <Route exact path="/time/:id/autorizar">
          <Autorizar pagina="time"/>
        </Route>
        <Route exact path="/grupo/:id/autorizar/:idTime">
          <Autorizar pagina="grupo"/>
        </Route>
        <Route exact path="/time/:id/lider">
          <Lider pagina="time"/>
        </Route>
        <Route exact path="/grupo/:id/lider">
          <Lider pagina="grupo"/>
        </Route>

        <Route exact path="*">
          <p>Erro 404</p>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
