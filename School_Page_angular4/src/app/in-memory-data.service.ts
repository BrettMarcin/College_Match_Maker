import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 0,  name: 'Umass' },
      { id: 1, name: 'MIT' },
      { id: 2, name: 'Harvard' },
      { id: 3, name: 'Stanford' },
      { id: 4, name: 'Princeton' },
      { id: 5, name: 'USC' },
      { id: 6, name: 'Yale University' },
      { id: 7, name: 'Brown University' },
      { id: 8, name: 'Duke University' },
      { id: 9, name: 'CIT' },
      { id: 10, name: 'Cornell University' }
    ];
    return {heroes};
  }
}
