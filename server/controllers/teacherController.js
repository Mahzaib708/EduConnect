import TeacherProfile from '../models/TeacherProfile.js';
import Application from '../models/Application.js';
import School from '../models/School.js';


export const updateProfile = async (req, res) => {
  const { qualification, experience, subjects, bio, availability } = req.body;

  const profileFields = {
    user: req.user._id,
    qualification,
    experience,
    subjects,
    bio,
    availability
  };

  try {
    let profile = await TeacherProfile.findOne({ user: req.user._id });

    if (profile) {
      // Update
      profile = await TeacherProfile.findOneAndUpdate(
        { user: req.user._id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    // Create
    profile = new TeacherProfile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const profile = await TeacherProfile.findOne({ user: req.user._id }).populate('user', ['firstName', 'lastName', 'email']);
    if (!profile) {
      return res.status(400).json({ message: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};


export const applyForJob = async (req, res) => {
    try {
        const school = await School.findById(req.params.schoolId);
        if(!school) {
            return res.status(404).json({ message: 'School not found' });
        }

        const existingApplication = await Application.findOne({
            teacher: req.user._id,
            school: req.params.schoolId
        });

        if(existingApplication) {
            return res.status(400).json({ message: 'Already applied to this school' });
        }

        const application = new Application({
            teacher: req.user._id,
            school: req.params.schoolId,
            coverLetter: req.body.coverLetter
        });

        await application.save();
        res.status(201).json(application);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ teacher: req.user._id }).populate('school');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
