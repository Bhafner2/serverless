import { CompanyBranchDto } from '../gen';
import { of } from 'rxjs';
import { CompanyBranchService } from './company-branch.service';

describe('CompanyBranchService', () => {
  let service: CompanyBranchService;
  const mockData = {
    id: 1,
    name: 'Mein Hof',
    farmNetCompanyId: 'farmNetCompanyId',
  } as CompanyBranchDto;

  const companyBranchRestServiceMock = createSpyObj('CompanyBranchRestService', ['getCompanyBranch']);
  companyBranchRestServiceMock.getCompanyBranch.and.returnValue(of(mockData));

  beforeEach(() => {
    service = new CompanyBranchService(null, companyBranchRestServiceMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(companyBranchRestServiceMock.getCompanyBranch).toHaveBeenCalled();
  });

  it('should reload', () => {
    const result = service.reload();
    expect(result).toBeTruthy();
  });

  it('companyBranch', (done) => {
    service.reload();

    expect(companyBranchRestServiceMock.getCompanyBranch).toHaveBeenCalledTimes(2);
    service.companyBranch$.subscribe((companyBranch) => {
      expect(companyBranch).toStrictEqual(mockData);
      done();
    });
  });
});
