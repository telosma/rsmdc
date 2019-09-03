import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'rs-data-table',
  styleUrl: "../../dist/result.css",
  shadow: true
})
export class DataTable {


  render() {
    return  <Host>
              <div class="rs-data-table">
                <table class="table" aria-label="Dessert calories">
                  <thead>
                    <tr class="headerrow">
                      <th class="headercell -checkbox" role="columnheader" scope="col">
                        <div class="rs-checkbox -header-row-checkbox -selected">
                          <input type="checkbox" class="nativecontrol" aria-label="Checkbox for header row selection" />
                          <div class="background">
                            {/* <svg class="checkmark" viewbox="0 0 24 24">
                              <path class="checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                            </svg> */}
                            <div class="mixedmark"></div>
                          </div>
                        </div>
                      </th>
                      <th class="headercell" role="columnheader" scope="col">Status</th>
                      <th class="headercell" role="columnheader" scope="col">Signal name</th>
                      <th class="headercell" role="columnheader" scope="col">Severity</th>
                      <th class="headercell" role="columnheader" scope="col">Stage</th>
                      <th class="headercell -numeric" role="columnheader" scope="col">Time</th>
                      <th class="headercell" role="columnheader" scope="col">Roles</th>
                    </tr>
                  </thead>
                  <tbody class="content">
                    <tr data-row-id="u0" class="row">
                      <td class="cell -checkbox">
                        <div class="rs-checkbox -row-checkbox">
                          <input type="checkbox" class="nativecontrol" aria-labelledby="u0" />
                          <div class="background">
                            {/* <svg class="mdc-checkbox__checkmark" viewbox="0 0 24 24">
                              <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                            </svg> */}
                            <div class="mixedmark"></div>
                          </div>
                        </div>
                      </td>
                      <td class="cell">Online</td>
                      <td class="cell" id="u0">Arcus watch slowdown</td>
                      <td class="cell">Medium</td>
                      <td class="cell">Triaged</td>
                      <td class="cell -numeric">0:33</td>
                      <td class="cell">Allison Brie</td>
                    </tr>
                    <tr data-row-id="u1" class="row -selected" aria-selected="true">
                      <td class="cell -checkbox">
                        <div class="rs-checkbox -checkbox -selected">
                          <input type="checkbox" class="nativecontrol" checked aria-labelledby="u1" />
                          <div class="background">
                            {/* <svg class="mdc-checkbox__checkmark" viewbox="0 0 24 24">
                              <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                            </svg> */}
                            <div class="mixedmark"></div>
                          </div>
                        </div>
                      </td>
                      <td class="cell">Offline</td>
                      <td class="cell" id="u1">monarch: prod shared ares-managed-features-provider-heavy</td>
                      <td class="cell">Huge</td>
                      <td class="cell">Triaged</td>
                      <td class="cell -numeric">0:33</td>
                      <td class="cell">Brie Larson</td>
                    </tr>
                    <tr data-row-id="u2" class="row -selected" aria-selected="true">
                      <td class="cell -checkbox">
                        <div class="rs-checkbox row-checkbox -selected">
                          <input type="checkbox" class="nativecontrol" checked aria-labelledby="u2" />
                          <div class="background">
                            {/* <svg class="mdc-checkbox__checkmark" viewbox="0 0 24 24">
                              <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                            </svg> */}
                            <div class="mixedmark"></div>
                          </div>
                        </div>
                      </td>
                      <td class="cell">Online</td>
                      <td class="cell" id="u2">monarch: prod shared ares-managed-features-provider-heavy</td>
                      <td class="cell">Minor</td>
                      <td class="cell">Not triaged</td>
                      <td class="cell -numeric">0:33</td>
                      <td class="cell">Jeremy Lake</td>
                    </tr>
                    <tr data-row-id="u3" class="row">
                      <td class="cell -checkbox">
                        <div class="rs-checkbox -row-checkbox">
                          <input type="checkbox" class="nativecontrol" aria-labelledby="u3" />
                          <div class="background">
                            {/* <svg class="checkmark" viewbox="0 0 24 24">
                              <path class="checkmarkpath" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                            </svg> */}
                            <div class="mixedmark"></div>
                          </div>
                        </div>
                      </td>
                      <td class="cell">Online</td>
                      <td class="cell" id="u3">Arcus watch slowdown</td>
                      <td class="cell">Negligible</td>
                      <td class="cell">Triaged</td>
                      <td class="cell -numeric">0:33</td>
                      <td class="cell">Angelina Cheng</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Host>
  }
}
