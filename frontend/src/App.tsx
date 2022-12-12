import UserDetails from "./components/UserDetails";
import UserEdit from "./components/UserEdit";
import UsersTable from "./components/UsersTable";

const App = () => {
  return (
    <div>
      <UsersTable />
      <UserDetails/>
      <UserEdit/>
    </div>
  );
};

export default App;
