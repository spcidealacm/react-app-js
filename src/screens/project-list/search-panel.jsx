export const SearchPanel = ({ param, setParam, managers }) => {
  return (
    <form>
      <input
        type="text"
        value={param.project_name}
        onChange={(event) =>
          setParam({
            ...param,
            project_name: event.target.value,
          })
        }
      />
      <select
        value={param.manager_id}
        onChange={(event) =>
          setParam({
            ...param,
            manager_id: event.target.value,
          })
        }
      >
        <option value="">Manager</option>
        {managers.map((manager) => (
          <option value={manager.id} key={manager.id}>
            Manager_ID:{manager.id} Name:{manager.name}
          </option>
        ))}
      </select>
    </form>
  );
};
