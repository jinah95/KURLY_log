import config from "./src/config";
import { app } from "./src/app";

const PORT = config.port || 5000;

app.listen(PORT, () => {
  console.log(`정상적으로 서버를 시작하였습니다. http://localhost:${PORT}`);
});
