import React from 'react';
import { Button, Collapse } from 'reactstrap';

function DT(props) {
  const [tab, setTab] = React.useState(0);
  const toggleCustom = tab => {
    const prevTab = tab;
    tab = prevTab === tab ? 0 : tab;
    setTab(tab);
  };
  const { Menus, MenuItems } = props;
  return (
    <>
      {
        Menus.filter(o => o.ParentMenuId === null).map(parent => {
          let submenu = Menus.filter(o => o.ParentMenuId === parent.Id);
          return <div key={parent.Id} className="item space">
            <Button
              block
              color='primary'
              className="m-2 p-1 btn-square"
              onClick={() => toggleCustom(parent.Id)}
              aria-expanded={tab === parent.Id}
              aria-controls="exampleAccordion1"
            >
              <i className={`mr-2 fa fa-${parent.Icon}`} /><strong>{parent.Nom}</strong>
            </Button>
            <Collapse isOpen={tab === parent.Id} data-parent="#exampleAccordion" id="exampleAccordion1">
              {
                submenu.map(item => {
                  return <div key={item.Id} className='space ml-4' >
                    <h6>{item.Nom} </h6>
                    {
                      MenuItems.filter(o => o.MenuId === item.Id).map(navItem => {
                        return <div key={navItem.Id} className='space ml-4' >
                          <p> - {navItem.Nom}</p>
                        </div>;
                      })
                    }
                  </div>;
                })
              }
            </Collapse>
          </div>;
        })
      }
    </>
  );
};

export default DT;