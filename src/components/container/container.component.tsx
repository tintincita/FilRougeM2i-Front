import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import ProjectModel from "../../models/project.model";
import WorkspaceModel from "../../models/workspace.model";
import { updateTitleDocumentById } from "../../services/document.service";
import { updateProjectTitleById } from "../../services/project.service";
import { updateTitleWorkspaceById } from "../../services/workspace.service";

interface WorkspaceProps {
  entity: any;
}

export const Container: React.FC<WorkspaceProps> = ({ entity }) => {
  const queryClient = useQueryClient();

  const { mutate: updateTitleW } = useMutation(updateTitleWorkspaceById, {
    onSuccess: () => {
      queryClient.invalidateQueries("workspaces");
    },
  });
  const { mutate: updateTitleP } = useMutation(updateProjectTitleById, {
    onSuccess: () => {
      queryClient.invalidateQueries("workspaces");
    },
  });

  const { mutate: updateTitleD} = useMutation(updateTitleDocumentById, {
    onSuccess: () => {
      queryClient.invalidateQueries("workspaces");
    },
  });


  let update = {
    Id: entity._id,
    title: entity.title,
  };

  function updateTitleEntity(e: any) {
    e.preventDefault();
    e.stopPropagation();
    update.title = e.target.value;
    if (entity.projects) {
      updateTitleW(update);
    }
    if (entity.documents) {
      updateTitleP(update);
    }
    if (entity.outlinerCards) {
      updateTitleD(update);
    }

  }

  function goToNextPage(e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (entity.projects) {
      window.location.href = "/project/" + entity._id;
    }
    if (entity.documents) {
      window.location.href = "/document/" + entity._id;
    }
    if (entity.outlinerCards) {
      window.location.href = "/outliner/" + entity._id;
    }
  }

  return (
    <div className="container" onClick={goToNextPage}>
      <h2> {entity.title}</h2>
      <input
        type="text"
        defaultValue={entity.title}
        onChange={updateTitleEntity}
      ></input>
    </div>
  );
};
