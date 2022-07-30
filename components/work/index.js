import SocialBar from '../../shared/components/socialbar';
import Landing from './landing';

const WorkPage = () => {
  return (
    <>
      <div className="bg-blue pt-28">
        <div className="overflow-x-hidden">
          <Landing />
        </div>
      </div>
      <SocialBar />
    </>
  );
};

export default WorkPage;
