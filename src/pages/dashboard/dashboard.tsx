
import BottomAppBar from '../../component/appbottom/bottom';
import ProminentAppBar from '../../component/apptop/top';
import './dashboard.css';
import MenuComponent from '../../component/menu/menu';
function Dashboard() {
  return (
    <>
     <ProminentAppBar showSearch={false} />
     <div>
     <MenuComponent /> 
    </div>
     <BottomAppBar showCreate={false} />
    </>
  )
}
export default Dashboard;