import { connect } from 'react-redux';
import { actions } from 'state/modules/schemas';
import { schemaSelectors } from 'state/selectors';
import Schemas from 'view/components/pure/Schemas';

const mapStateToProps = () => {
  return state => ({
    schemas: schemaSelectors.schemasSelector(state),
  });
}

const mapDispatchToProps = {
  deleteSchema: actions.delete,
};

export default connect(mapStateToProps, mapDispatchToProps)(Schemas);