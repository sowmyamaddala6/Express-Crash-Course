 const express = require('express');
 const router = express.Router(); 
 const uuid = require('uuid');
 const members = require('../../Members'); 

// Gets all members
router.get('/', (req, res) => res.json(members));

//Get single members
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg: `No member with the id of ${req.params.id}`}); 
    }
});


//Create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    if(!newMember.name || !newMember.email) {
        return res.status(400).json({msg: 'Please include a name and email'});
    }

    members.push(newMember);
    res.json(members);
    //res.redirect('/');
});

// Update Member
router.put('/:id', (req, res) => {
    const found = members.some(idFilter(req));
  
    if (found) {
      members.forEach((member, i) => {
        if (idFilter(req)(member)) {
  
          const updMember = {...member, ...req.body};
          members[i] = updMember
          res.json({ msg: 'Member updated', updMember });
        }
      });
    } else {
      res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
  });

  // Delete Member
router.delete('/:id', (req, res) => {
    const found = members.some(idFilter(req));
  
    if (found) {
      res.json({
        msg: 'Member deleted',
        members: members.filter(member => !idFilter(req)(member))
      });
    } else {
      res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
  });

module.exports = router;