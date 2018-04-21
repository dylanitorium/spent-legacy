import { connect } from 'react-redux';
import { hasBudgetsSelector } from 'state/selectors';
import Main from 'view/components/pure/Main';

const mapStateToProps = () => state => ({
  hasBudgets: hasBudgetsSelector(state),
});

export default connect(mapStateToProps)(Main);
