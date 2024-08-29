import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import "./app.scss";
import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "./hooks/dataProvider"; // Đảm bảo đường dẫn chính xác
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { AppIcon } from "./components/app-icon";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import {
  ExercisesCreate,
  ExercisesEdit,
  ExercisesList,
  ExercisesShow,
} from "./pages/exercises";
import { FeedbacksList, FeedbacksShow } from "./pages/feedbacks";
import {
  PromocodesCreate,
  PromocodesEdit,
  PromocodesList,
  PromocodesShow,
} from "./pages/promocodes";
import { QuizsCreate, QuizsEdit, QuizsList, QuizsShow } from "./pages/quizs";
import { JobsCreate, JobsEdit, JobsList, JobsShow } from "./pages/jobs";
import { FoodsCreate, FoodsEdit, FoodsList, FoodsShow } from "./pages/foods";
import { StockCreate, StockEdit, StockList, StockShow } from "./pages/stock";
import {
  StepChatBoxsCreate,
  StepChatBoxsEdit,
  StepChatBoxsList,
  StepChatBoxsShow,
} from "./pages/stepChatBoxs";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: "blog_posts",
                    list: "/blog-posts",
                    create: "/blog-posts/create",
                    edit: "/blog-posts/edit/:id",
                    show: "/blog-posts/show/:id",
                    meta: { canDelete: true },
                  },
                  {
                    name: "categories",
                    list: "/categories",
                    create: "/categories/create",
                    edit: "/categories/edit/:id",
                    show: "/categories/show/:id",
                    meta: { canDelete: true },
                  },
                  {
                    name: "exercises",
                    list: "/exercises",
                    create: "/exercises/create",
                    edit: "/exercises/edit/:id",
                    show: "/exercises/show/:id",
                    meta: { canDelete: true },
                  },
                  {
                    name: "feedbacks",
                    list: "/feedbacks",
                    show: "/feedbacks/show/:id",
                    meta: { canDelete: true },
                  },
                  {
                    name: "promocodes",
                    list: "/promocodes",
                    create: "/promocodes/create",
                    edit: "/promocodes/edit/:id",
                    show: "/promocodes/show/:id",
                    meta: { canDelete: true },
                  },
                  {
                    name: "quizs",
                    list: "/quizs",
                    create: "/quizs/create",
                    edit: "/quizs/edit/:id",
                    show: "/quizs/show/:id",
                    meta: { canDelete: true },
                  },
                  {
                    name: "jobs",
                    list: "/jobs",
                    create: "/jobs/create",
                    edit: "/jobs/edit/:id",
                    show: "/jobs/show/:id",
                    meta: { canDelete: true },
                  },
                  {
                    name: "foods",
                    list: "/foods",
                    create: "/foods/create",
                    edit: "/foods/edit/:id",
                    show: "/foods/show/:id",
                    meta: { canDelete: true },
                  },
                  {
                    name: "stock",
                    list: "/stock",
                    create: "/stock/create",
                    edit: "/stock/edit/:id",
                    show: "/stock/show/:id",
                    meta: { canDelete: true },
                  },
                  {
                    name: "step_chat_boxs",
                    list: "/step-chat-box",
                    create: "/step-chat-box/create",
                    edit: "/step-chat-box/edit/:id",
                    show: "/step-chat-box/show/:id",
                    meta: { canDelete: true },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "m6fbC6-wopGuI-P9KYD3",
                  title: { text: "Admin YFood", icon: <AppIcon /> },
                }}
              >
                <Routes>
                  <Route
                    element={
                      <ThemedLayoutV2 Header={() => <Header sticky />}>
                        <Outlet />
                      </ThemedLayoutV2>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource='blog_posts' />}
                    />
                    <Route path='/blog-posts'>
                      <Route index element={<BlogPostList />} />
                      <Route path='create' element={<BlogPostCreate />} />
                      <Route path='edit/:id' element={<BlogPostEdit />} />
                      <Route path='show/:id' element={<BlogPostShow />} />
                    </Route>
                    <Route path='/categories'>
                      <Route index element={<CategoryList />} />
                      <Route path='create' element={<CategoryCreate />} />
                      <Route path='edit/:id' element={<CategoryEdit />} />
                      <Route path='show/:id' element={<CategoryShow />} />
                    </Route>
                    <Route path='/exercises'>
                      <Route index element={<ExercisesList />} />
                      <Route path='create' element={<ExercisesCreate />} />
                      <Route path='edit/:id' element={<ExercisesEdit />} />
                      <Route path='show/:id' element={<ExercisesShow />} />
                    </Route>
                    <Route path='/feedbacks'>
                      <Route index element={<FeedbacksList />} />
                      <Route path='show/:id' element={<FeedbacksShow />} />
                    </Route>
                    <Route path='/promocodes'>
                      <Route index element={<PromocodesList />} />
                      <Route path='create' element={<PromocodesCreate />} />
                      <Route path='edit/:id' element={<PromocodesEdit />} />
                      <Route path='show/:id' element={<PromocodesShow />} />
                    </Route>
                    <Route path='/quizs'>
                      <Route index element={<QuizsList />} />
                      <Route path='create' element={<QuizsCreate />} />
                      <Route path='edit/:id' element={<QuizsEdit />} />
                      <Route path='show/:id' element={<QuizsShow />} />
                    </Route>
                    <Route path='/jobs'>
                      <Route index element={<JobsList />} />
                      <Route path='create' element={<JobsCreate />} />
                      <Route path='edit/:id' element={<JobsEdit />} />
                      <Route path='show/:id' element={<JobsShow />} />
                    </Route>
                    <Route path='/foods'>
                      <Route index element={<FoodsList />} />
                      <Route path='create' element={<FoodsCreate />} />
                      <Route path='edit/:id' element={<FoodsEdit />} />
                      <Route path='show/:id' element={<FoodsShow />} />
                    </Route>
                    <Route path='/stock'>
                      <Route index element={<StockList />} />
                      <Route path='create' element={<StockCreate />} />
                      <Route path='edit/:id' element={<StockEdit />} />
                      <Route path='show/:id' element={<StockShow />} />
                    </Route>
                    <Route path='/step-chat-box'>
                      <Route index element={<StepChatBoxsList />} />
                      <Route path='create' element={<StepChatBoxsCreate />} />
                      <Route path='edit/:id' element={<StepChatBoxsEdit />} />
                      <Route path='show/:id' element={<StepChatBoxsShow />} />
                    </Route>
                  </Route>
                </Routes>
                <DevtoolsPanel />
              </Refine>
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
