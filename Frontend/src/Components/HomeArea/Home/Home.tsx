import "./Home.css";
import giftSource from '../../../Assets/Images/gift.jpg'

function Home(): JSX.Element {
    return (
        <div className="Home">
			<h1>Choosing gifts for a loved one can be difficult at times. Not only do you have to think about what to buy them, but also where to get them from – not made any easier in times when many of us cannot physically get to shops.</h1>

        <img src={giftSource} />
        </div>

   
    ); 
}

export default Home;
