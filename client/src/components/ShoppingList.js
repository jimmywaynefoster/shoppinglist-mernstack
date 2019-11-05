import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../redux/actions/itemActions';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from './Spinner';

export class ShoppingList extends Component {
  componentDidMount = () => {
    this.props.getItems();
  };

  handdleDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render = () => {
    const { items, loading } = this.props;

    return (
      <div className='shopping-list'>
        {loading && <Spinner />}
        <ListGroup>
          <TransitionGroup className='shopping-list-group'>
            {items.map(({ name, _id }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <Button
                    className='remove-btn mr-3'
                    color='danger'
                    size='sm'
                    onClick={this.handdleDeleteClick.bind(this, _id)}>
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </div>
    );
  };
}

const mapStateToProps = ({ item }) => ({
  items: item.items,
  loading: item.loading,
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(ShoppingList);