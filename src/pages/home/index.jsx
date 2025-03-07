import { useSelector } from "react-redux";
import Card from "../../components/card";
import "./home.scss";
import Loader from "../../components/loader/index";
import Error from "../../components/error/index";

const Home = () => {
  const { jobs, isLoading, error } = useSelector((store) => store.jobReducer);

  const grouped = jobs.reduce((grouped, job) => {
    // Eğer yeni oluşturduğumuz nesnede status'e karşılık gelen bir dizi yoksa boş bir dizi oluştur.
    if (!grouped[job.status]) {
      grouped[job.status] = [];
    }

    // İş'in status değerine karşılık gelen diziye işi pushla
    grouped[job.status].push(job);

    // Nesnenin son halini return et
    return grouped;
  }, {});

  return (
    <div className="home-page">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error} />
      ) : (
        <div className="layout">
          {/*  Object.keys() yöntemiyle Nesnenin anahtar değerlerinden bir dizi oluşturduk. Oluşturulan diziyi döndükten sonra nesnenin her bir anahtar değerine karşılık gelen nesne içerisindeki dizileri dönüp ekrana bastık
           */}
          {Object.keys(grouped).map((status) => (
            <div key={status} className="group">
              <h1 className="title">
                {status} ({grouped[status].length})
              </h1>

              <div className="list">
                {grouped[status].map((job) => (
                  <Card key={job.id} job={job} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
