import Homepage from "./pages/Homepage";
import Journal from "./pages/Journal";
import MaybeCleanJournal from "./pages/MaybeCleanJournal";
import AddToMaybeCleanJournal from "./components/Journal/MaybeClean/AddToMaybeCleanJournal";
import CleanedCount from "./components/Journal/NextButton/CleanedCount";
import EditForm from "./components/Journal/Edit/EditForm";
import AddForm from "./components/Homepage/Add/AddForm";
import NotClean from "./components/MaybeCleanJournal/NotClean/NotClean";
import CompletelyClean from "./components/MaybeCleanJournal/CompletelyClean/CompletelyClean";
import { Switch, Route } from "react-router-dom";

// 1. Mapping over data
export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/journal" component={Journal} />
        <Route exact path="/maybecleanjournal" component={MaybeCleanJournal} />
        <Route
          path="/delete/:deleteId/:currentCount"
          component={CompletelyClean}
        />
        <Route path="/notclean/:notcleanId" component={NotClean} />
        <Route exact path="/add" component={AddForm} />
        <Route path="/change/:changeId" component={CleanedCount} />
        <Route
          path="/addtomaybecleanjournal/:cleanId"
          component={AddToMaybeCleanJournal}
        />
        <Route path="/edit/:reframeId" component={EditForm} />
      </Switch>
    </div>
  );
}
