import React, { Component } from 'react';
import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import SwapiService from '../../services/swapi-service';
import Row from '../row';
import ErrorBoundry from '../error-boundry';
import './people-page.css';


export default class PeoplePage extends Component {
  swapiService = new SwapiService();

  state = {
    selectedPerson: 3
  };

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  }

  render() {

    const itemList = (
      <ItemList 
        onItemSelected={this.onPersonSelected} 
        getData={this.swapiService.getAllPeople}
        renderItem={( {name, gender, birthYear} ) => `${name} (${gender}, ${birthYear})`}
      />
    );

    const personDetails = (
      <ErrorBoundry>
        <PersonDetails personId={this.state.selectedPerson} />
      </ErrorBoundry>
    );

    return (
        <ErrorBoundry>
          <Row left={itemList} right={personDetails} />
        </ErrorBoundry>
    );
  }
}
