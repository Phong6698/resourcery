export interface TsAppVersion {
    version: string;
    name: string;
    description?: string;
    versionLong?: string;
    versionDate: string;
    gitCommitHash?: string;
    gitCommitDate?: string;
    gitTag?: string;
};
export const versions: TsAppVersion = {
    version: '0.0.0',
    name: 'resourcery',
    versionDate: '2021-02-22T10:40:42.760Z',
    gitCommitHash: '5b8bf43',
    versionLong: '0.0.0-5b8bf43',
};
export default versions;
