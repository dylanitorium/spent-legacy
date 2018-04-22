import { connect } from 'react-redux';
import { activeBudgetLabelSelector } from 'state/selectors';
import Header from 'view/components/pure/Header';

const mapStateToProps = () => state => ({
  activeBudgetLabel: activeBudgetLabelSelector(state),
});

export default connect(mapStateToProps)(Header);
