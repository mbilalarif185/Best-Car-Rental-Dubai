export default function AgentSettingsPage() {
  return (
    <>
      <div className="row mb-3">
        <div className="col-xl-12">
          <div className="card shadow-none flex-fill mb-3">
            <div className="bg-overlay overflow-hidden">
              <img className="w-100 h-100 img-banner" src="/assets/imgs/page-header/banner8.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card shadow-none flex-fill mb-3">
            <div className="card-header">
              <p className="neutral-1000 text-md-bold fs-5 py-1">Update your profile</p>
            </div>
            <div className="card-body">
              <div className="row pt-4">
                <div className="col-lg-6 mb-3 mb-lg-0">
                  <div className="box-avatar-profile d-flex align-items-center">
                    <div className="image-avatar me-3">
                      <img src="/assets/imgs/page/homepage2/honda.png" alt="" />
                    </div>
                    <button type="button" className="btn btn-primary me-3">Change avatar</button>
                    <i className="fi fi-rr-trash" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="box-avatar-profile d-flex align-items-center">
                    <div className="image-avatar-2 w-50 me-3 rounded-2 overflow-hidden">
                      <img src="/assets/imgs/page-header/banner8.png" alt="" />
                    </div>
                    <button type="button" className="btn btn-primary me-3">Update</button>
                    <i className="fi fi-rr-trash" />
                  </div>
                  <p className="text-sm-medium neutral-500 mt-2">Recommended dimensions are typically 400 x 400 pixels.</p>
                </div>
              </div>
              <div className="py-5">
                <div className="hr" />
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Full Name *</label>
                    <input className="form-control" type="text" placeholder="Steven Job" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Email *</label>
                    <input className="form-control" type="text" placeholder="stevenjob@gmail.com" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Contact number *</label>
                    <input className="form-control" type="text" placeholder="Contact number" defaultValue="01 - 234 567 89" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Personal website</label>
                    <input className="form-control" type="text" placeholder="https://alithemes.com/" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Bio</label>
                    <textarea className="form-control" placeholder="Your comment" rows={6} defaultValue="We are AliThemes , a creative and dedicated group of individuals who love web development almost as much as we love our customers. We are passionate team with the mission for achieving the perfection in web design." />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Languages</label>
                    <input className="form-control" type="text" defaultValue="English, French" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Nationality</label>
                    <input className="form-control" type="text" placeholder="Tour Experience" defaultValue="France" />
                  </div>
                </div>
              </div>
              <div className="box-button-save mt-15">
                <button type="button" className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
          <div className="card shadow-none flex-fill mb-3">
            <div className="card-header">
              <p className="neutral-1000 text-md-bold fs-5 py-1">Contact Information</p>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Country</label>
                    <input className="form-control" type="text" placeholder="Country" defaultValue="United States of America" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">City</label>
                    <input className="form-control" type="text" placeholder="City" defaultValue="Chicago" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Complete Address</label>
                    <input className="form-control" type="text" placeholder="Complete Address" defaultValue="205 North Michigan Avenue, Suite 810, Chicago, 60601, USA" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Find On Map</label>
                    <input className="form-control" type="text" placeholder="Find On Map" defaultValue="205 North Michigan Avenue, Suite 810, Chicago, 60601, USA" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Latitude</label>
                    <input className="form-control" type="text" placeholder="Address" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Longitude</label>
                    <input className="form-control" type="text" placeholder="Address 2" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Google Map</label>
                    <div className="map-tour">
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120835.65146929219!2d2.5873635107259836!3d47.992147406516835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5878d50e09eab%3A0x40b82c3688c4a20!2s77460%20Souppes-sur-Loing%2C%20Ph%C3%A1p!5e0!3m2!1svi!2s!4v1715095452879!5m2!1svi!2s" width="100%" height="363" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Map" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-button-save mt-15">
                <button type="button" className="btn btn-primary">Save Changes</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="card shadow-none flex-fill">
                <div className="card-header">
                  <p className="neutral-1000 text-md-bold fs-5 py-1">Social Network</p>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <label className="lbl-checkbox text-sm-medium neutral-500">Facebook</label>
                      <div className="form-group">
                        <input className="form-control" type="text" placeholder="https://www.facebook.com/" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <label className="lbl-checkbox text-sm-medium neutral-500">Twitter</label>
                      <div className="form-group">
                        <input className="form-control" type="text" placeholder="https://twitter.com/" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <label className="lbl-checkbox text-sm-medium neutral-500">Instagram</label>
                      <div className="form-group">
                        <input className="form-control" type="text" placeholder="https://www.instagram.com/" />
                      </div>
                    </div>
                  </div>
                  <div className="box-button-save mt-15">
                    <button type="button" className="btn btn-primary">Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-none flex-fill">
                <div className="card-header">
                  <p className="neutral-1000 text-md-bold fs-5 py-1">Change Password</p>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <label className="lbl-checkbox text-sm-medium neutral-500">Old Password</label>
                      <div className="form-group">
                        <input className="form-control" type="password" placeholder="*************" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <label className="lbl-checkbox text-sm-medium neutral-500">New Password</label>
                      <div className="form-group">
                        <input className="form-control" type="password" placeholder="*************" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <label className="lbl-checkbox text-sm-medium neutral-500">Confirm new password</label>
                      <div className="form-group">
                        <input className="form-control" type="password" placeholder="*************" />
                      </div>
                    </div>
                  </div>
                  <div className="box-button-save mt-15">
                    <button type="button" className="btn btn-primary">Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
