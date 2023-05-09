import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TestPart from "../../models/TestPart";




export default function Grades() {


    const testPartsData: TestPart[] = useSelector((state: any) => state.testParts.testPartsData);

    const [finalGrade, setFinalGrade] = useState(0);

    const [finalTeacherGrade, setFinalTeacherGrade] = useState(0);

    useEffect(() => {

        const sumPoints: number = testPartsData.reduce((prev, tp) =>
            prev + tp.TestPartPoints - (tp.PointsToReduce || 0)
            , 0);

        setFinalGrade(sumPoints);

        const sumTeacherPoints: number = testPartsData.reduce((prev, tp) =>
            prev + (tp.TeacherGrade || tp.TestPartPoints)
            , 0);

        setFinalTeacherGrade(sumTeacherPoints);

    }, [testPartsData]);

    return <div>

ציון סופי מחושב: {finalGrade}  
<br/>
  ציון סופי מורה: {finalTeacherGrade}
  <br/>
  ציון מאמר חלקי שתים: {finalTeacherGrade/2}
    </div>
}