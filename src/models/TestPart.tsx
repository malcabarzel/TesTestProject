import { testParts } from "../initialData"

export default interface TestPart {
    TestPartId: number,
    TestTypeId: number,
    SuperTestPartId?: number,
    TestPartDsc: string,
    TestPartPoints:number,
    PointsToReduce?:number,
    TeacherGrade?:number
}

export const GetTestPart = (testPartId: number, testParts: TestPart[]) => {
    const testPart = testParts.find(t => t.TestPartId === testPartId);
    if (testPart)
        return testPart;
    return null;
}