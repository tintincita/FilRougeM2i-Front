import { useMutation, useQueryClient } from "react-query";
import {
  deleteDocumentById,
  updateDescriptionDocumentById,
  updateTitleDocumentById,
} from "../../services/document.service";
import {
  deleteProjectById,
  updateProjectDescriptionById,
  updateProjectTitleById,
} from "../../services/project.service";
import {
  deleteWorkspaceById,
  updateDescriptionWorkspaceById,
  updateTitleWorkspaceById,
} from "../../services/workspace.service";
import { GrFormNextLink } from "react-icons/gr";
import "./container.css";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

let edit = false;
interface WorkspaceProps {
  entity: any;
}
export const Container: React.FC<WorkspaceProps> = ({ entity }) => {
  const queryClient = useQueryClient();

  /* A react-query hook that is used to update the title of a workspace. */
  const { mutate: updateTitleW } = useMutation(updateTitleWorkspaceById);

  /* A react-query hook that is used to update the title of a project. */
  const { mutate: updateTitleP } = useMutation(updateProjectTitleById);

  /* A react-query hook that is used to update the title of a document. */
  const { mutate: updateTitleD } = useMutation(updateTitleDocumentById);

 /* It's a react-query hook that is used to update the description of a document. */
  const { mutate: updateDescriptionD } = useMutation(
    updateDescriptionDocumentById
  );

  /* It's a react-query hook that is used to update the description of a project. */
  const { mutate: updateDescriptionP } = useMutation(
    updateProjectDescriptionById
  );

 /* It's a react-query hook that is used to update the description of a workspace. */
  const { mutate: updateDescriptionW } = useMutation(
    updateDescriptionWorkspaceById
  );

  /* Creating an object that will be used to update the title of the entity. */
  let updateTitle = {
    Id: entity._id,
    title: entity.title,
  };

  /* It's creating an object that will be used to update the description of the entity. */
  let updateDescription = {
    Id: entity._id,
    description: entity.description,
  };

  /**
   * When the user types in the input field, the value of the input field is assigned to the title
   * property of the update object, and then the update object is passed to the appropriate function to
   * update the title of the entity.
   * @param {any} e - any - the event object
   */
  function updateTitleEntity(e: any) {
    e.preventDefault();
    e.stopPropagation();
    updateTitle.title = e.target.value;
    if (entity.projects) {
      updateTitleW(updateTitle);
    }
    if (entity.documents) {
      updateTitleP(updateTitle);
    }
    if (entity.outlinerCards) {
      updateTitleD(updateTitle);
    }
  }

 /**
  * UpdateDescriptionEntity is a function that takes an event as an argument and updates the
  * description of an entity
  * @param {any} e - any - the event object
  */
  function updateDescriptionEntity(e: any) {
    e.preventDefault();
    e.stopPropagation();
    updateDescription.description = e.target.value;
    if (entity.projects) {
      updateDescriptionW(updateDescription);
      queryClient.invalidateQueries("workspaces");
    }
    if (entity.documents) {
      updateDescriptionP(updateDescription);
      queryClient.invalidateQueries("projects");
    }
    if (entity.outlinerCards) {
      updateDescriptionD(updateDescription);
      queryClient.invalidateQueries("documents");
    }
  }

  /**
   * If the entity has a property called projects, documents, or outlinerCards, then go to the next
   * page.
   * @param {any} e - any - the event that is passed to the function
   */
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

  /**
   * If the edit variable is true, set it to false. If it's false, set it to true. Then, invalidate the
   * queries for workspaces, projects, and documents.
   * @param {any} e - any - this is the event that is passed to the function.
   */
  function editTitle(e: any) {
    if (edit) {
      edit = false;
    } else {
      edit = true;
    }
    queryClient.invalidateQueries("workspaces");
    queryClient.invalidateQueries("projects");
    queryClient.invalidateQueries("documents");
  }

  /* It's a react-query hook that is used to delete a project. */
  const { mutate: deleteProject } = useMutation(deleteProjectById, {
    onSuccess: () => {
      queryClient.invalidateQueries("projects");
    },
  });

  /* It's a react-query hook that is used to delete a workspace. */
  const { mutate: deleteWorkspace } = useMutation(deleteWorkspaceById, {
    onSuccess: () => {
      queryClient.invalidateQueries("workspaces");
    },
  });

  /* It's a react-query hook that is used to delete a document. */
  const { mutate: deleteDocument } = useMutation(deleteDocumentById, {
    onSuccess: () => {
      queryClient.invalidateQueries("documents");
    },
  });

  /**
   * If the entity has projects, delete the workspace, if the entity has documents, delete the project,
   * if the entity has outlinerCards, delete the document.
   * @param {any} e - any - the event object
   */
  function deleteEntity(e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (entity.projects) {
      deleteWorkspace(entity._id);
    }
    if (entity.documents) {
      deleteProject(entity._id);
    }
    if (entity.outlinerCards) {
      deleteDocument(entity._id);
    }
  }

  return (
    <div className="container">
      {edit ? (
        <textarea
          id="title"
          defaultValue={entity.title}
          onChange={updateTitleEntity}
        ></textarea>
      ) : (
        <h2>{entity.title}</h2>
      )}
      <button onClick={editTitle} className="edit">
        <FiEdit />
      </button>
      <button className="delete" onClick={deleteEntity}>
        <AiOutlineDelete />
      </button>
      <button onClick={goToNextPage} className="next">
        <GrFormNextLink />
      </button>

      {edit ? (
        <textarea
          defaultValue={entity.description}
          id="description"
          onChange={updateDescriptionEntity}
        ></textarea>
      ) : (
        <p>{entity.description}</p>
      )}
    </div>
  );
};
