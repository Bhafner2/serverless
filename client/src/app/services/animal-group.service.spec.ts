import { AnimalGroupService } from './animal-group.service';
import { AnimalDto, AnimalGroupDto } from '../gen';
import { of } from 'rxjs';

describe('AnimalGroupService', () => {
  let service: AnimalGroupService;
  const mockData = [
    {
      id: 1,
      name: 'Herde 1p',
      animals: [
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
      ],
    } as AnimalGroupDto,
    {
      id: 2,
      name: 'Mutterkühe',
      animals: [
        {
          id: 21,
          name: 'Isabella',
        } as AnimalDto,
        {
          id: 22,
          name: 'Super Langer Kuh name um die Tabelle ans maximum zu testen',
        } as AnimalDto,
        {
          id: 23,
          name: 'Heidi2',
        } as AnimalDto,
      ],
    } as AnimalGroupDto,
  ];

  const animalGroupRestServiceMock = createSpyObj('AnimalGroupRestService', [
    'getAnimalGroups',
    'postAnimalGroupsWithId',
  ]);
  animalGroupRestServiceMock.getAnimalGroups.and.returnValue(of(mockData));
  animalGroupRestServiceMock.postAnimalGroupsWithId.and.returnValue(of(mockData));

  const animalServiceMock = createSpyObj('AnimalService', ['reload']);

  beforeEach(() => {
    service = new AnimalGroupService(null, animalGroupRestServiceMock, animalServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(animalGroupRestServiceMock.getAnimalGroups).toHaveBeenCalled();
  });

  it('should reload', () => {
    const result = service.reload();
    expect(result).toBeTruthy();
  });

  it('animalGroups', (done) => {
    service.reload();

    expect(animalGroupRestServiceMock.getAnimalGroups).toHaveBeenCalledTimes(2);
    service.animalGroups$.subscribe((animalGroups) => {
      expect(animalGroups).toStrictEqual(mockData);
      done();
    });
  });

  it('set setActiveAnimalGroup', () => {
    service.setActiveAnimalGroupId(1);
    expect(service.activeAnimalGroupId).toBe(1);
  });

  it('set setActiveAnimalGroup with null', () => {
    service.setActiveAnimalGroupId(null);
    expect(service.activeAnimalGroupId).toBe(null);
  });

  it('activeAnimalGroup', (done) => {
    service.setActiveAnimalGroupId(1);

    service.activeAnimalGroup$.subscribe((animalGroup) => {
      expect(animalGroup.id).toBe(1);
      expect(animalGroup).toStrictEqual({
        animals: [
          {
            id: 1,
            name: 'Elsa',
          },
          {
            id: 2,
            name: 'Elvira',
          },
          {
            id: 3,
            name: 'Heidi',
          },
        ],
        id: 1,
        name: 'Herde 1p',
      });
      done();
    });
  });

  it('activeAnimalGroup undefined', (done) => {
    service.setActiveAnimalGroupId(undefined);

    service.activeAnimalGroup$.subscribe((animalGroup) => {
      expect(animalGroup).toStrictEqual({});
      done();
    });
  });

  it('should save', () => {
    const animalGroup = { id: 1 } as AnimalGroupDto;
    service.save(animalGroup);

    expect(animalGroupRestServiceMock.postAnimalGroupsWithId).toHaveBeenCalledWith(1, animalGroup);
    expect(animalGroupRestServiceMock.getAnimalGroups).toHaveBeenCalled();
    expect(animalServiceMock.reload).toHaveBeenCalled();
  });
});
