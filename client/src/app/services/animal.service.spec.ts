import { AnimalService } from './animal.service';
import { AnimalDto } from '../gen';
import { of } from 'rxjs';

describe('AnimalService', () => {
  let service: AnimalService;
  const mockData = [
    {
      id: 1,
      name: 'Elsa',
    } as AnimalDto,
    {
      id: 2,
      name: 'Elvira',
    } as AnimalDto,
    {
      id: 3,
      name: 'Heidi',
    } as AnimalDto,
  ];
  const animalRestServiceMock = createSpyObj('AnimalRestService', ['getAnimals']);
  animalRestServiceMock.getAnimals.and.returnValue(of(mockData));

  beforeEach(() => {
    service = new AnimalService(null, animalRestServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(animalRestServiceMock.getAnimals).toHaveBeenCalled();
  });

  it('should reload', () => {
    const result = service.reload();
    expect(result).toBeTruthy();
  });

  it('animals', (done) => {
    service.reload();

    expect(animalRestServiceMock.getAnimals).toHaveBeenCalledTimes(2);
    service.animals$.subscribe((animals) => {
      expect(animals).toStrictEqual(mockData);
      done();
    });
  });
});
