import styles from "./home.module.css";

function Home() {
  return (
    <div className={styles.homeIntro}>
      <div className={styles.homeImage}>
        <img
          src={"/katsiaryna-endruszkiewicz-BteCp6aq4GI-unsplash.jpg"}
          alt="Girl with sunglasses and a flower on her lips"
        ></img>
      </div>
      <div className={styles.homeText}>
        <h1 className={styles.homeTextTitle}>Spring feelings</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, magnam
          odit. Magni, enim dignissimos culpa expedita suscipit veritatis harum
          laudantium odio veniam, debitis consequuntur velit aperiam! Quidem
          culpa nobis saepe?
        </p>
      </div>
    </div>
  );
}

export default Home;
