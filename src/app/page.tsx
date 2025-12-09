import Image from "next/image";
import HomePage from "../component/HomePage/HomePage";
import SimilarBook from "../component/SimilarBook/SimilarBook";
export default function Home() {
  return (
    <div>
      <div className="images" style={{ borderBottom: "1px solid gray" }}><HomePage /></div>
      <div className="book-detail">
        <div className='main'>
          <h1>Crime</h1>
          <SimilarBook Category="Crime" />
        </div>
        <div className='main'>
          <h1>Programming</h1>
          <SimilarBook Category="Programming" />
        </div>
        <div className='main'>
          <h1>History</h1>
          <SimilarBook Category="History" />
        </div>

        <div className='main'>
          <h1>General Knowledge</h1>
          <SimilarBook Category="General Knowledge" />
        </div>
        <div className='main'>
          <h1>Health</h1>
          <SimilarBook Category="Health" />
        </div>
        <div className='main'>
          <h1>Financial Education</h1>
          <SimilarBook Category="Financial Education" />
        </div>

        <div className='main'>
          <h1>Stories</h1>
          <SimilarBook Category="Stories" />
        </div>

      </div>
    </div>
  );
}
