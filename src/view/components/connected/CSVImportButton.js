import { connect } from 'react-redux';
import { actions as schemaActions } from 'state/modules/schemas';
import { actions as eventActions } from 'state/modules/events';
import { schemaSelectors } from 'state/selectors';
import CSVImportButton from 'view/components/pure/CSVImportButton';

const mapStateToProps = () => {
  return state => ({
    activeSchema: schemaSelectors.activeSchemaSelector(state),
  });
};

const mapDispatchToProps = {
  onImport: eventActions.createEventsFromImport,
  createSchema: schemaActions.createSchema,
  onError: (e) => console.log(e),
};

export default connect(mapStateToProps, mapDispatchToProps)(CSVImportButton);
