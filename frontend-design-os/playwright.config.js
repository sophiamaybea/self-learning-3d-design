import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
 testDir:"./tests", timeout:35000,
 use:{baseURL:"http://127.0.0.1:4173",trace:"retain-on-failure"},
 webServer:{command:"npm run dev -- --host 127.0.0.1 --port 4173",url:"http://127.0.0.1:4173",reuseExistingServer:!process.env.CI,timeout:90000},
 projects:[
  {name:"desktop-chromium",use:{...devices["Desktop Chrome"]}},
  {name:"mobile-chromium",use:{...devices["iPhone 13"],browserName:"chromium"}}
 ]
});
