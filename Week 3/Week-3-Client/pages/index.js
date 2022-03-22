import { useRouter } from "next/router";
import LoaderStyles from '../styles/Loader.module.css'

export default function Home() {
  const router = useRouter();

  if (router.isFallback) {
    return <div className={LoaderStyles.loader}></div>;
  }
}
