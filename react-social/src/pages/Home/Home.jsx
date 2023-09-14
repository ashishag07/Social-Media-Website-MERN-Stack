import Topbar from '../../components/Topbar/Topbar';
import Leftbar from '../../components/Leftbar/Leftbar';
import CenterFeedbar from '../../components/CenterFeedbar/CenterFeedbar';
import Rightbar from '../../components/Rightbar/Rightbar';
import './home.css'

function Home() {
  return (
    <div>
      <Topbar />

      <div className='homepage'>
        <Leftbar />
        <CenterFeedbar/>
        <Rightbar />
      </div>
    
    </div>
    
  );
}

export default Home;