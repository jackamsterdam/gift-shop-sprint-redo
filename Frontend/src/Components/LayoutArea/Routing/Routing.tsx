import { Routes, Route } from 'react-router-dom'
import AddGift from '../../GiftsArea/AddGift/AddGift';
import GiftList from '../../GiftsArea/GiftList/GiftList';
import Home from '../../HomeArea/Home/Home';
import PageNotFound from '../PageNotFound/PageNotFound';

function Routing(): JSX.Element {
    return (
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/" element={<Home/>}/>

          <Route path='/gift-list' element={<GiftList/>}/>
          <Route path="/add-gift" element={<AddGift/>} />

          <Route path="*" element={<PageNotFound/>} />
        </Routes>
    );
}

export default Routing;
