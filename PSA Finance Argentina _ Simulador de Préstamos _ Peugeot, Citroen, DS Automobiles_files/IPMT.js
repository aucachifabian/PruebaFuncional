// Copyright (c) 2012 Sutoiku, Inc. (MIT License)
 
// Some algorithms have been ported from Apache OpenOffice:
 
/**************************************************************
 * 
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 * 
 *************************************************************/

function IPMT(rate, period, periods, present, future, type) {
  // Credits: algorithm inspired by Apache OpenOffice

  // Initialize type
  var type = (typeof type === 'undefined') ? 0 : type;

  // Evaluate rate and periods (TODO: replace with secure expression evaluator)
  rate = eval(rate);
  periods = eval(periods);

  // Compute payment
  var payment = PMT(rate, periods, present, future, type);
  
  // Compute interest
  var interest;
  if (period === 1) {
    if (type === 1) {
      interest = 0;
    } else {
      interest = -present;
    }
  } else {
    if (type === 1) {
      interest = FV(rate, period - 2, payment, present, 1) - payment;
    } else {
      interest = FV(rate, period - 1, payment, present, 0);
    }
  }
  
  // Return interest
  return interest * rate;
}