import { connect } from 'react-redux';
import { activeBudgetSelector } from 'state/selectors';
import Header from 'view/components/pure/Header';

const mapStateToProps = () => state => ({
  activeBudget: activeBudgetSelector(state),
});

export default connect(mapStateToProps)(Header);
