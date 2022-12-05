import { VersionModel } from "../../models/VersionModel";

export const GetVersions = async (req, res) => {
    try {
      const fsdVersions = await VersionModel.find().exec()
      res.status(200).send(fsdVersions)
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Error fetching software versions'})
    }
}

export const AddVersion = async (req, res) => {
  const { fsdVersionNumber, softwareVersionNumber } = req.body

  console.log(fsdVersionNumber);
  console.log(softwareVersionNumber);

  if(!fsdVersionNumber || !softwareVersionNumber) {
    res.status(500).json({ message: 'FSD version and software version number fields required'})
  }

  else {
    try {
      const versionToAdd = new VersionModel({
        fsdVersionNumber,
        softwareVersionNumber
      })

      const savedVersion = await versionToAdd.save()

      res.status(200).send(savedVersion)
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Error saving version'})
    }
  }
}
