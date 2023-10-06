import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSkill } from "../../redux/slices/skillSlice";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { total } = useSelector((state) => state.skill);

  useEffect(() => {
    dispatch(getSkill());
  }, [dispatch]);

  return (
    <div>
      <h1>All Skills ({total})</h1>
    </div>
  );
};

export default DashboardPage;
