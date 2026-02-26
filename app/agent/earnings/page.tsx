export default function AgentEarningsPage() {
  return (
    <>
      <div className="row mb-3">
        <div className="col-lg-3 mb-3 mb-lg-0">
          <div className="card shadow-none flex-fill bg-1">
            <div className="box-earning px-3 py-4 text-center">
              <span className="avatar rounded-circle bg-primary me-3">
                <i className="fi fi-rr-piggy-bank" />
              </span>
              <p>Balances</p>
              <h6>$125.987</h6>
              <a href="#">View Transactions</a>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="card shadow-none flex-fill bg-3">
            <div className="box-earning px-3 py-4">
              <span className="neutral-1000 text-md-bold fs-5">Withdraw & transfer</span>
              <div className="row">
                <div className="col-lg-3 me-2 me-lg-0">
                  <p className="fs-8 two-line-ellipsis neutral-500">Bank Name</p>
                  <p className="fs-6 text-truncate text-md-bold">Agrik Bank Inc</p>
                </div>
                <div className="col-lg-4 me-2 me-lg-0">
                  <p className="fs-8 two-line-ellipsis neutral-500">Card number</p>
                  <p className="fs-6 text-truncate text-md-bold">1658 - 2563 - 2356 - 2533</p>
                </div>
                <div className="col-lg-3 me-2 me-lg-0">
                  <p className="fs-8 two-line-ellipsis neutral-500">Name on card</p>
                  <p className="fs-6 text-truncate text-md-bold">JOND DAVICE</p>
                </div>
                <div className="col-lg-2 me-2 me-lg-0">
                  <p className="fs-8 two-line-ellipsis neutral-500">PIN</p>
                  <p className="fs-6 text-truncate text-md-bold">256</p>
                </div>
              </div>
              <div className="d-flex gap-5 justify-content-between w-100 mt-4">
                <a className="d-flex align-items-center gap-1 text-primary-dark" href="#"><i className="fi fi-rr-add" />Add new card</a>
                <a className="d-flex align-items-center gap-1 text-primary-dark" href="#"><i className="fi fi-rr-bank" />Withdraw to bank</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-xl-12 d-flex">
          <div className="card shadow-none flex-fill">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <span className="neutral-1000 text-md-bold fs-5">Earnings</span>
                <div className="dropdown">
                  <a href="#" className="dropdown-toggle btn btn-sort bg-neutral-100 btn-sm text-gray-6 rounded-pill fw-normal fs-8 d-inline-flex align-items-center" data-bs-toggle="dropdown">
                    <i className="fi fi-rr-filter-list me-2" /> Fillter
                  </a>
                  <ul className="dropdown-menu small dropdown-menu-end p-2">
                    <li><a href="#" className="dropdown-item rounded-1"><i className="ti ti-point-filled me-1" /> All</a></li>
                    <li><a href="#" className="dropdown-item rounded-1"><i className="ti ti-point-filled me-1" /> Success</a></li>
                    <li><a href="#" className="dropdown-item rounded-1"><i className="ti ti-point-filled me-1" /> Pending</a></li>
                    <li><a href="#" className="dropdown-item rounded-1"><i className="ti ti-point-filled me-1" /> Canceled</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body">
              <p>Total Earnings</p>
              <div className="d-flex align-items-end gap-3">
                <h6 className="text-primary-dark">$125.987</h6>
                <span><span className="text-success me-2"><i className="fi fi-rr-arrow-small-up" />5%</span>vs last years</span>
              </div>
              <div className="card shadow-none mb-2 mt-3">
                <div className="card-body">
                  <div id="chart-3" style={{ minHeight: 200 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-xl-12">
          <div className="card shadow-none flex-fill">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <span className="neutral-1000 text-md-bold fs-5">Transaction</span>
                <div className="dropdown">
                  <a href="#" className="dropdown-toggle btn btn-sort bg-neutral-100 btn-sm text-gray-6 rounded-pill fw-normal fs-8 d-inline-flex align-items-center" data-bs-toggle="dropdown">
                    <i className="fi fi-rr-filter-list me-2" /> Fillter
                  </a>
                  <ul className="dropdown-menu small dropdown-menu-end p-2">
                    <li><a href="#" className="dropdown-item rounded-1"><i className="ti ti-point-filled me-1" /> All</a></li>
                    <li><a href="#" className="dropdown-item rounded-1"><i className="ti ti-point-filled me-1" /> Recent</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body">
              <p className="neutral-500">Updated every several minutes</p>
              <div className="table-responsive">
                <table className="table datatable table-striped">
                  <thead className="thead-light">
                    <tr>
                      <th>ID</th>
                      <th>Car &amp; Type</th>
                      <th>Travellers</th>
                      <th>Days</th>
                      <th>Price</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><a href="#" className="text-primary-dark fw-medium">#CR-5236</a></td>
                      <td>
                        <div className="d-flex align-items-center">
                          <a href="#" className="avatar avatar-lg"><img src="/assets/imgs/cars-listing/cars-listing-6/car-7.png" className="img-fluid" alt="" /></a>
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14"><a href="#">Infiniti QX60</a></p>
                            <span className="fs-14 fw-normal neutral-500">Hatchback</span>
                          </div>
                        </div>
                      </td>
                      <td>2 Adults, 2 Child</td>
                      <td>5 Days</td>
                      <td>$2,380</td>
                      <td>12 Jul 2025</td>
                      <td><span className="badge badge-warning rounded-pill d-inline-flex align-items-center fs-10"><i className="fi fi-rr-caret-right me-1" />Pending</span></td>
                    </tr>
                    <tr>
                      <td><a href="#" className="text-primary-dark fw-medium">#CR-1256</a></td>
                      <td>
                        <div className="d-flex align-items-center">
                          <a href="#" className="avatar avatar-lg"><img src="/assets/imgs/cars-listing/cars-listing-6/car-8.png" className="img-fluid" alt="" /></a>
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14"><a href="#">Toyota 86 Coupe</a></p>
                            <span className="fs-14 fw-normal neutral-500">Sedan</span>
                          </div>
                        </div>
                      </td>
                      <td>2 Adults, 1 Child</td>
                      <td>3 Days</td>
                      <td>$1,400</td>
                      <td>26 Jul 2025</td>
                      <td><span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10"><i className="fi fi-rr-caret-right me-1" />Completed</span></td>
                    </tr>
                    <tr>
                      <td><a href="#" className="text-primary-dark fw-medium">#CR-2356</a></td>
                      <td>
                        <div className="d-flex align-items-center">
                          <a href="#" className="avatar avatar-lg"><img src="/assets/imgs/cars-listing/cars-listing-6/car-9.png" className="img-fluid" alt="" /></a>
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14"><a href="#">Jeep Wrangler</a></p>
                            <span className="fs-14 fw-normal neutral-500">Coupe</span>
                          </div>
                        </div>
                      </td>
                      <td>2 Adults, 2 Child</td>
                      <td>2 Days</td>
                      <td>$1,810</td>
                      <td>10 Aug 2025</td>
                      <td><span className="badge badge-success rounded-pill d-inline-flex align-items-center fs-10"><i className="fi fi-rr-caret-right me-1" />Completed</span></td>
                    </tr>
                    <tr>
                      <td><a href="#" className="text-primary-dark fw-medium">#CR-5414</a></td>
                      <td>
                        <div className="d-flex align-items-center">
                          <a href="#" className="avatar avatar-lg"><img src="/assets/imgs/cars-listing/cars-listing-6/car-10.png" className="img-fluid" alt="" /></a>
                          <div className="ms-2">
                            <p className="text-dark mb-0 fw-medium fs-14"><a href="#">Jaguar XK</a></p>
                            <span className="fs-14 fw-normal neutral-500">Sedan</span>
                          </div>
                        </div>
                      </td>
                      <td>3 Adults, 1 Child</td>
                      <td>2 Days</td>
                      <td>$1,450</td>
                      <td>22 Aug 2025</td>
                      <td><span className="badge badge-danger rounded-pill d-inline-flex align-items-center fs-10"><i className="fi fi-rr-caret-right me-1" />Canceled</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item"><a className="page-link" href="#" aria-label="Previous"><span aria-hidden="true"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6.00016 1.33325L1.3335 5.99992M1.3335 5.99992L6.00016 10.6666M1.3335 5.99992H10.6668" stroke="" strokeLinecap="round" strokeLinejoin="round" /></svg></span></a></li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link active" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#">4</a></li>
                  <li className="page-item"><a className="page-link" href="#">5</a></li>
                  <li className="page-item"><a className="page-link" href="#">...</a></li>
                  <li className="page-item"><a className="page-link" href="#" aria-label="Next"><span aria-hidden="true"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M5.99967 10.6666L10.6663 5.99992L5.99968 1.33325M10.6663 5.99992L1.33301 5.99992" stroke="" strokeLinecap="round" strokeLinejoin="round" /></svg></span></a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
